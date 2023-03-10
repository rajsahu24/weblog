import React from 'react'
import { previewData } from "next/headers"
import {groq} from "next-sanity"
import { client } from "../../lib/sanity.client"
import PreviewSuspense from "../../components/PreviewSuspens"
import PreviewBlogList from "../../components/PreviewBlogList"
import BlogList from '../../components/BlogList'
import Footer from '../../components/Footer'
const query = groq`
  *[_type=='post']{
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)

`;
 
export const revalidate = 30

export default async function HomePage() {
  if (previewData()) {
    return (<PreviewSuspense fallback={(
      <div role="status">
        <p className='text-center text-lg animate-pulse text-[#F7AB0A]'>
          lodding Preview data..
        </p>
      </div>
    )}>
      <PreviewBlogList query={query} />
    </PreviewSuspense>)
  }
  const posts = await client.fetch(query);
  // console.log(posts)
  return (
    <div>
      <BlogList posts={posts} />
      <Footer />

      </div >
  )
}

