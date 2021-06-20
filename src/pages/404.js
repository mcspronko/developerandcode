import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Страница не найдена" />
      <h1>404: Страница не найдена</h1>
      <p>Такая страница не существует, или была удалена.</p>
      <p>
        <Link to="/">На Главную</Link>
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
