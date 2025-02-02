const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadBase64Image(base64Image) {
    try {
        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`

        const buffer = Buffer.from(base64Image, "base64")

        const { data, error } = await supabase.storage
            .from("dreamai")
            .upload(`public/${fileName}.jpg`, buffer, {
                contentType: "image/jpeg"
            })

        if (error) {
            throw new Error(error.message)
        }

        const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`

        return imageUrl
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = {
    uploadBase64Image
}
