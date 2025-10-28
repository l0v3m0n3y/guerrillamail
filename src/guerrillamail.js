class guerrillamail{
    constructor(){
        this.api = "https://api.guerrillamail.com/ajax.php"
        this.headers={"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36","x-requested-with": "xmlhttprequest","Content-Type":"application/vnd.api+json"}
        this.sid_token=null
        this.language="en"
    }
    async req(url, data,method="GET"){
    if (data) {
            method="POST"
            data = JSON.stringify(data);
        }
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: this.headers,
                body: data
            }).then(res => res.json()).then(data => {resolve(data);
            }).catch(err => reject(err));
        });
    }
    async get_email(){
        let response=(await this.req(`${this.api}?f=get_email_address&lang=${this.language}`));
        this.sid_token=response["sid_token"]
        return response
    }
    async set_email(email){
    let response=(await this.req(`${this.api}?f=set_email_user&email_user=${email}&language=${this.language}&sid_token=${this.sid_token}`));
    this.sid_token=response["sid_token"]
    return response
    }
    async check_email(seq){
    return (await this.req(`${this.api}?f=check_email&seq=${seq}&sid_token=${this.sid_token}`));
    }
    async get_email_list(size){
    return (await this.req(`${this.api}?f=get_email_list&offset=${offset}&sid_token=${this.sid_token}`));
    }
    async fetch_email(email_id){
    return (await this.req(`${this.api}?f=fetch_email&email_id=${email_id}&sid_token=${this.sid_token}`));
    }
    async delete_email(email_id){
    return (await this.req(`${this.api}?f=del_email&email_ids[]=${email_id}&sid_token=${this.sid_token}`));
    }
}
module.exports = {guerrillamail};