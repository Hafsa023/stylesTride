import { createClient } from "next-sanity";



const client = createClient({
    projectId: "x18ojk87",
    dataset: "production",
    apiVersion: "2023-10-10",
    useCdn: true,
})

