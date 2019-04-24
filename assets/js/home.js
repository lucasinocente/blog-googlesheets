function loadHome() {
  const sheetId = '1kfcHc1TNm1DHKLRf_WEwdcdyX23_V9IhiZ8hsFs-pVM'
  const sheetAsJsonUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetId + '/od6/public/values?alt=json'

  const xhr = new XMLHttpRequest()
  xhr.open('GET', sheetAsJsonUrl)
  xhr.send()
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const postList = document.getElementById('post-list')
      const response = JSON.parse(xhr.responseText)
      const posts = response.feed.entry
      for (let i = 0; i < posts.length; i++) {
        console.log(posts[i])
        let post = renderPostList(posts[i])
        postList.innerHTML += post
      }
    }
  }
}

function renderPostList(post) {
  const title = post.gsx$title.$t
  const image = post.gsx$image.$t
  const url = post.gsx$url.$t
  const content = post.gsx$content.$t

  return '<div class="column">' +
            '<a href="posts/#' + url +'">' +
              '<div class="card">' +
                '<div class="card-image">' +
                  '<figure class="image is-4by3">' +
                    '<img src="' + image + '" alt="' + title + '">' +
                  '</figure>' +
                '</div>' +
                '<div class="card-content">' +
                  '<div class="content">' +
                    '<h3 class="title is-4">' + title + '</h3>' +
                    '<p>' + content.slice(0, 90) + ' [...]</p>' +
                    '<span class="button"> Saiba mais </span>'
                  '</div>' +
                '</div>' +
              '</div>' +
            '</a>' +
          '</div>'
}

loadHome()