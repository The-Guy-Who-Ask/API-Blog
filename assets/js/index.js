let genericApi = (method, url, data = null) => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest
        apiRequest.open(method, url)
        apiRequest.setRequestHeader('content-type', 'application/json')
        if (method.toLowerCase() == 'post')
            apiRequest.setRequestHeader('Authorization', 'Bearer 643abd36a0c3c11a8da4f67b1177421bcd55240f5d552b3ba281420862a1b4cf')
        apiRequest.onload = () => {
            if (apiRequest.status < 400) resolve(JSON.parse(apiRequest.response))
            else reject(JSON.parse(apiRequest.response))
        }
        if (method.toLowerCase() == 'post') apiRequest.send(JSON.stringify(data))
        else apiRequest.send()
    })
}

/*
 *const genericAPI = (method, url, data = null) => {
 *    return new Promise((resolve, reject) => {
 *        
 *        let xhhtp = new XMLHttpRequest()
 *        xhhtp.open(method,url)
 *        xhhtp.setRequestHeader('Content-Type', 'application/json')
 *        xhhtp.setRequestHeader('Accept', 'application/json')
 *        
 *        if(method.toLowerCase() == 'post')
 *            xhhtp.setRequestHeader('Authorization', 'Bearer 1e38f1c53ceac380f50dc35ae73f9ac6c71194d195a2e5bffe02b5ab9a5bea25')
 *            
 *            xhhtp.onload = () => {
 *            if(xhhtp.status < 400){
 *                resolve(JSON.parse(xhhtp.response))
 *            }else{
 *                reject(JSON.parse(xhhtp.response))
 *            }
 *        }
 *
 *        if(method.toLowerCase() == 'post')
 *            xhhtp.send(JSON.stringify(data))
 *        else
 *            xhhtp.send()
 *    })
 * 
 * }

 * <section class="all">
 *     <h1>post title</h1>
 *     <p>post body</p>
 *     <span>created by</span>
 *     <p>full body</p>
 *     <p class="com">all comments</p>
 *     <p class="creby">commented by</p>
 * </section>
 * 
 * <div class="post">
 *     <h1>post title</h1>
 *     <p>post body</p>
 * </div>
 * <div class="user">
 *     <p class="cre">posted by name</p>
 *     <p class="cre">posted by gender</p>
 *     <p class="cre">posted by status</p>
 *     <p class="cre">posted by email</p>
 * </div>
 * <div class="comment">
 *     <p class="com">comment 1</p>
 *     <p class="cre">commented by name</p>
 *     <p class="cre">commented by email</p>
 *     <p class="com">comment 2</p>
 *     <p class="cre">commented by name</p>
 *     <p class="cre">commented by email</p>
 *     <p class="com">comment 3</p>
 *     <p class="cre">commented by name</p>
 *     <p class="cre">commented by email</p>
 * </div>
 *
**/

document.querySelector('div.buttons button.userApi').addEventListener('click', async () => {
    let posts = await genericApi('GET', 'https://gorest.co.in/public/v1/posts')
    let html = '';
    for (let post of posts.data) {
        html += `
             <section class="each">
             <h1>${post.title}</h1>
             <p class="body">${post.body.substr(0, Math.floor(post.body.length / 2))}</p>`
        let users = await genericApi('GET', `https://gorest.co.in/public/v1/users/${post.user_id}`)
        html += `created by:<span>${users.data.name}</span>
                 <p class="button ${post.id}">know more about this post</p>
                 </section>`
    }
    document.querySelector('section.all').innerHTML = html
    let buttons = document.querySelectorAll('section.all section.each p.button')
    for (let button in buttons) {
        if (parseInt(button) == NaN) { console.log(button) }
        else { var val = button }
        buttons[val].addEventListener('click', async () => {
            let html3 = '';
            let posts = await genericApi('GET', 'https://gorest.co.in/public/v1/posts')
            for (let post of posts.data) {
                let users = await genericApi('GET', `https://gorest.co.in/public/v1/users/${post.user_id}`)
                let comments = await genericApi('GET', `https://gorest.co.in/public/v1/comments?post_id=${post.id}`)
                for (let comment of comments.data) {
                    html3 += `<div class="each">
                                    <div class="post">
                                        <h1>${post.title}</h1>
                                        <p>${post.body}</p>
                                        </div>
                                    <div class="user">
                                    <p class="cre">posted by ${users.data.name}</p>
                                        <p class="cre">poster email: ${users.data.email}</p>
                                        </div>
                                    <div class="comment">
                                    <p class="com">comment: ${comment.body}</p>
                                        <p class="cre">commented by ${comment.name}</p>
                                        <p class="cre">commentor email: ${comment.email}</p>
                                    </div>
                                </div>`
                }
                document.querySelector('section.all').innerHTML = html3

            }
        })
    }
})
/**
 *
 * const genericAPI = (method, url, data = null) => {
 *    return new Promise((resolve, reject) => {
 *        
 *        let xhhtp = new XMLHttpRequest()
 *        xhhtp.open(method,url)
 *        xhhtp.setRequestHeader('Content-Type', 'application/json')
 *        xhhtp.setRequestHeader('Accept', 'application/json')
 *        
 *        if(method.toLowerCase() == 'post')
 *            xhhtp.setRequestHeader('Authorization', 'Bearer 1e38f1c53ceac380f50dc35ae73f9ac6c71194d195a2e5bffe02b5ab9a5bea25')
 *            
 *            xhhtp.onload = () => {
 *            if(xhhtp.status < 400){
 *                resolve(JSON.parse(xhhtp.response))
 *            }else{
 *                reject(JSON.parse(xhhtp.response))
 *            }
 *        }
 *
 *        if(method.toLowerCase() == 'post')
 *            xhhtp.send(JSON.stringify(data))
 *        else
 *            xhhtp.send()
 *    })
 * }


/**
 * @author Murtaza
 *
 * @description [ Async Await function which will show post and name of author ]
 * @uses [ .apiDataPostWithUserName]
 */
/*
 *document.querySelector("main section.getAPIS div.buttons button.userPostApi").addEventListener('click', async () => {
 *     let posts = await genericAPI('GET','https://gorest.co.in/public/v1/posts')
 *     let html = ''
 *     for (const post of posts.data) {
 *         html += `<h4><em>${post.id}</em></h4>
 *                 <h1>${post.title}</h1>
 *                 <p>${post.body}</p>`
 *
 *         let user = await genericAPI('GET',`https://gorest.co.in/public/v1/users/${post.user_id}`)
 *         html += `<h4>${user.data.name}</h4>`
 *
 *         let comments = await genericAPI('GET',`https://gorest.co.in/public/v1/comments?post_id=${post.user_id}`)
 *         console.log(comments)
 *         for (const comment of comments.data) {
 *             html += `<p><span>${comment.name} :</span><span>${comment.body.substr(0,30)}</span></p>`
 *         }
 *         html += `<hr>`
 *     document.querySelector("main section.getAPIS section.apiDataPostWithUserName").innerHTML = html
 *     }
 * })
 *
 *
 *
 * // button.userApi
 * // button.postApi
 * // button.commentApi
 *
 * // User Button
 *
 * document.querySelector("main section.getAPIS div.buttons button.userApi").addEventListener('click', () => {
 *     console.log('user button click')
 *     genericAPI('GET','https://gorest.co.in/public/v1/users').then(
 *         data => {
 *             let html = '';
 *             for (let d of data.data){
 *                 html += `<h1>${d.name}</h1>`
 *             }
 *             document.querySelector("main section.getAPIS section.apiData").innerHTML = html
 *         }
 *     ).catch(e => console.log(e))
 * })
 *
 * // POST Button
 * document.querySelector("main section.getAPIS div.buttons button.postApi").addEventListener('click', () => {
 *     console.log('user button click')
 *     genericAPI('GET','https://gorest.co.in/public/v1/posts').then(
 *         data => {
 *             let html = '';
 *             for (let d of data.data){
 *                 html += `<h1>${d.title}</h1>`
 *             }
 *             document.querySelector("main section.getAPIS section.apiData").innerHTML = html
 *         }
 *     ).catch(e => console.log(e))
 * })
 *
 * // Comment Button
 * document.querySelector("main section.getAPIS div.buttons button.commentApi").addEventListener('click', () => {
 *     genericAPI('GET','https://gorest.co.in/public/v1/comments').then(
 *         data => {
 *             let html = '';
 *             for (let d of data.data){
 *                 html += `<h1>${d.name}</h1>`
 *             }
 *             document.querySelector("main section.getAPIS section.apiData").innerHTML = html
 *         }
 *     ).catch(e => console.log(e))
 * })
 * document.querySelector("main section.getAPIS div.buttons button.allApi").addEventListener('click', () => {
 *     genericAPI('GET','https://gorest.co.in/public/v1/comments').then(
 *         data => {
 *             let html = '<div><h1>COMMENT DATA </h1></div>';
 *             for (let d of data.data){
 *                 html += `<h5>${d.name}</h5>`
 *             }
 *             document.querySelector("main section.getAPIS section.apiDataComment").innerHTML = html
 *         }
 *     ).catch(e => console.log(e))
 *     genericAPI('GET','https://gorest.co.in/public/v1/posts').then(
 *         data => {
 *             let html = '<div><h1>Post DATA </h1></div>';
 *             for (let d of data.data){
 *                 html += `<h5>${d.title}</h5>`
 *             }
 *             document.querySelector("main section.getAPIS section.apiDataPost").innerHTML = html
 *         }
 *     ).catch(e => console.log(e))
 *     genericAPI('GET','https://gorest.co.in/public/v1/users').then(
 *         data => {
 *             let html = '<div><h1>USER DATA </h1></div>';
 *             for (let d of data.data){
 *                 html += `<h5>${d.name}</h5>`
 *             }
 *             document.querySelector("main section.getAPIS section.apiDataUser").innerHTML = html
 *         }
 *     ).catch(e => console.log(e))
 * })
 */
document.querySelector("div.buttons button.postApi").addEventListener('click', () => {
    console.log('post button click')
    genericApi('GET', 'https://gorest.co.in/public/v1/posts').then(
        data => {
            let html = '';
            for (let d of data.data) {
                html += `<h1>${d.title}</h1>`
            }
            document.querySelector("section.all").innerHTML = html
        }
    ).catch(e => console.log(e))
})