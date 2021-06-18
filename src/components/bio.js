/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            youtube
            telegram
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt={author?.name}
      />
      {author?.name && (
        <p>
          <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          Автор <a target="_blank" rel="noreferrer" href={`https://www.youtube.com/channel/${social?.youtube || ``}`}>
          YouTube
        </a> канала о разработке.
          {` `}
          <a target="_blank" rel="noreferrer" href={`https://t.me/${social?.telegram || ``}`}>
            Телеграм
          </a>
          {` `}группа сайта.
        </p>
      )}
    </div>
  )
}

export default Bio
