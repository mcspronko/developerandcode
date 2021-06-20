import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PHPBlogPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const page = data.markdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Блог на PHP - Все видеоуроки. Веб разработка PHP, MySQL, JavaScript" />
      <Bio />

      <h1>{ page.frontmatter.title }</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: page.html
        }}
        itemProp="description"
      />
    </Layout>
  )
}

export default PHPBlogPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: {title: {eq: "Блог на PHP"}}) {
        id
        frontmatter {
          title
        }
        html
    }
  }
`
