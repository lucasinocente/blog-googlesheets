function loadPost() {
  const sheetId = '1kfcHc1TNm1DHKLRf_WEwdcdyX23_V9IhiZ8hsFs-pVM'
  const sheetAsJsonUrl = 'https://spreadsheets.google.com/feeds/list/' + sheetId + '/od6/public/values?alt=json'
  const slug = location.hash.replace('#', '')

  const xhr = new XMLHttpRequest()
  xhr.open('GET', sheetAsJsonUrl)
  xhr.send()
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.responseText)
      const posts = response.feed.entry
      for (let i = 0; i < posts.length; i++) {
        if (slug === posts[i].gsx$url.$t) {
          renderSinglePost(posts[i])
        }
      }
    }
  }
}

function renderSinglePost(post) {
  const title = post.gsx$title.$t
  const image = post.gsx$image.$t
  const content = post.gsx$content.$t

  document.getElementById('post-title').innerHTML = title
  document.getElementById('post-image').src = image
  document.getElementById('post-content').innerHTML = content

}

loadPost()