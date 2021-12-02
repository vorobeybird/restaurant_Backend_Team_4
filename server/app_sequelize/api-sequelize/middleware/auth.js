var axios = require("axios");
var awsconfig = require("../aws-exports");

const COGNITO_URL = `https://cognito-idp.${awsconfig.aws_project_region}.amazonaws.com/`;

const isAuth = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        const {data} = await axios.post(
            COGNITO_URL,
            {
                AccessToken: accessToken
            },
            {
                headers: {
                    "Content-Type": "application/x-amz-json-1.1",
                    "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser"
                }
            }
        )
        req.user = data;
        next();
    } catch (error) {
        console.log(error, " Error")
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = isAuth;