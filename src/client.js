import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "ly1o9qot",
    dataset: "production",
    apiVersion: '2021-08-31',
    useCdn: true
})