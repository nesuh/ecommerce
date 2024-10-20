import { config } from "dotenv";


export const sendEmail = async(
    to:string,
    templateName:string,
    subject:string,
    date:Record<string.any> = { },
) =>{
    try{

   
    const form= new FormData();
    form.append('to',to);
    form.append('template',templateName);
    form.append('subject',subject);
    form.append(
        'from',
        'mailgun@sendbox ---uuid.mailgun.org',
        );
    Object.keys(templateVars).forEach(
        (key)=>{
            form.append(`v:${key}`,templateVars[key])
} )

const username = 'api';
const password =config.get('emailService.privateKey');
const token =Buffer.from(`${username}:${password}`).toString('base64')

const response =await axios({
    method:'post',
    url:`https://api.mailgun.net/v3/${config.get('emailService.testDomain')}/messages`,
    headers:{
        Authorization:`Basic ${token}`,
        contentType:'multipart/form-data'
    },
    data:form
})
return response

}catch(error){
        
}
// function axios(arg0: { method: string; url: string; headers: { Authorization: string; contentType: string; }; data: FormData; }) {
//     throw new Error("Function not implemented.");
// }
