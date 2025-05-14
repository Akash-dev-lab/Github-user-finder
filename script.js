let userInput = document.querySelector(".userInput");
let btn = document.querySelector(".search");
let card = document.querySelector("#user-data");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found.");
    return raw.json();
  });
}

function decorateProfileData(details) {
  console.log(details)
  let data = `<div class="bg-[#1C2839] rounded-2xl shadow-xl p-8">
       
    <div class="flex items-center space-x-6">
          <img src="${
            details.avatar_url
          }" alt="Avatar" class="w-20 h-20 rounded-full border border-gray-300" id="avatar">
          <div>
            <h2 class="text-2xl text-white font-bold" id="name">${
              details.name
            }</h2>
            <p class="text-gray-400" id="username">${details.location}</p>
            <p class="text-sm text-gray-400" id="bio">${details.bio}</p>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-400">Public Repos</p>
            <p class="text-lg text-white font-medium" id="repos">${
              details.public_repos
            }</p>
          </div>
          <div>
            <p class="text-sm text-gray-400">Followers</p>
            <p class="text-lg text-white font-medium" id="followers">${
              details.followers
            }</p>
          </div>
          <div>
            <p class="text-sm text-gray-400">Following</p>
            <p class="text-lg text-white font-medium" id="following">${
              details.following
            }</p>
          </div>
          <div>
            <p class="text-sm text-gray-400">Location</p>
            <p class="text-lg text-white font-medium" id="location">${
              details.location
            }</p>
          </div>
          <div>
            <p class="text-sm text-gray-400">Company</p>
            <p class="text-lg text-white font-medium" id="company">${
              details.company ? details.company : "N/A ❌"
            }</p>
          </div>
          <div>
            <p class="text-sm text-gray-400">Twitter</p>
            <p class="text-lg text-white font-medium" id="twitter">${
              details.twitter_username ? details.twitter_username : "N/A"
            }</p>
          </div>
        </div>
        <div class="mt-6">
          <a rel="noopener" href="${
            details.html_url
          }" target="_blank" class="text-blue-600 hover:underline font-semibold">View GitHub Profile →</a>
        </div>
        </div>`;
  card.innerHTML = data;
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new Error("Didn't fetch repos...");
  });
}

getRepos("Akash-dev-lab");

btn.addEventListener("click", () => {
  let username = userInput.value.trim();
  if (username.length > 0) {
    getProfileData(username).then((data) => {
      decorateProfileData(data);
    });
  } else {
    alert();
  }
});
