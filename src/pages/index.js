import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import DateLocale from "../components/DateLocale";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Веб разработка PHP, MySQL, JavaScript" />
        <Bio />
        <p>
         Постов на этом сайте нет.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Веб разработка PHP, MySQL, JavaScript" />
      <Bio />
      <p>Все видео: <Link to="/php-blog">Блог на PHP</Link></p>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          const postDate = DateLocale(post.frontmatter.date)
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{postDate}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        filter: {fields: {slug: {ne: "/php-blog/"}}},
        sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
