import { Request, Response } from "express";
import axios from "axios";

const redirectUri = "http://localhost:3000/api/callback"; // used for getting data from discord
const discordApiUrl = "https://discord.com/api/users/@me"; // api
const clientId = "1075023249114681344"; // your id
const clientSecret = ""; // your secret 
const apiBaseUrl = "https://discord.com/api"; // also api

function AuthRoutes(app: any) {

    app.get("/Login", (req: Request, res: Response) => {
        
        // your own url
        const url = ``;
        res.redirect(url);
    });

    app.get("/api/callback", async (req: Request, res: Response) => {
        const code = req.query.code;

        if (!code) {
            return res.send('Seems like we couldnt get the code from discord.') // you can send them back to login by doing 'res.redirect('/Login')'
        }

        try {

            const ReqData = {
                url: `${apiBaseUrl}/oauth2/token`,
                method: "POST",
                data: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${code}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }

            const tokenRes = await axios.request(ReqData) // sends user to discords login page

            const tokenData = await tokenRes.data; // gets the data from discords response
            const accessToken = await tokenData.access_token; // gets the access_token from the discords response

            // gets the users data based off this request
            const userRes = await axios({
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
                url: `${discordApiUrl}`
            })
      
        res.send(JSON.stringify(userRes.data)) // sends the data to the user for them to view

        } catch (err) {
            console.log(err)
        }

    });

}


export { AuthRoutes }
