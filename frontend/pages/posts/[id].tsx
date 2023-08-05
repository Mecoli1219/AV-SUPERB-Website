
interface IPost {
    id: string,
    description: string
}

export default function Post({ post }: {post:IPost}) {
  // Render post...
  return (
    <h1>{post.description}</h1>
  )
}

const posts: IPost[] = [
  {
    id: '1',
    description: 'First Post',
  },
  {
    id: '2',
    description: 'Second Post'
  }
]

const fetch_data = (id: string): IPost | undefined => {
  return posts.find((post: IPost)=>{
    return post.id === id
  })
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  //   const res = await fetch('https://.../posts')
  //   const posts = await res.json()
  

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: IPost) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }: {params: {id: string}}) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = fetch_data(params.id)
  const post = res

  // Pass post data to the page via props
  return { props: { post } }
}