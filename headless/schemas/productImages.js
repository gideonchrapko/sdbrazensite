export default {
    name: "productImages",
    title: "Product title Images go in here (order of products in Shopitfy must be the same order as images in here)",
    type: "document",
    fields: [
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
        }
    ]
}