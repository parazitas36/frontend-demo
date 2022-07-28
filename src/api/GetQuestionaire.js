import React from 'react'

const GetQuestionaire = async () => {
    // URL of the questionaire API
    const URL = "https://opentdb.com/api.php?amount=10"
    console.log('call')
    // Get questionaire
    const response = await fetch(URL, {
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        }
    })

    // Parse reposonse to json
    const json = await response.json()
    return json
}

export default GetQuestionaire