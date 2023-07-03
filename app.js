const dropdown = document.getElementById('search');
    const userContainer = document.getElementById('userContainer');

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        users.forEach(user => {
          const newOption = document.createElement('option');
          newOption.textContent = user.username;
          newOption.value = user.id;
          dropdown.appendChild(newOption);
        });

        dropdown.addEventListener('change', function() {
          const selectedUserId = this.value;

          const selectedUser = users.find(user => user.id === parseInt(selectedUserId));

          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`)
            .then(response => response.json())
            .then(posts => {
              if (selectedUser) {
                const userPosts = posts.map(post => `<li>${selectedUser.name}: ${post.title}</li>`).join('');
                const location = `${selectedUser.address.city}`;
                userContainer.innerHTML = `
                  <h3>${selectedUser.username}</h3>
                  <p>${selectedUser.name}</p>
                  <p>${location}</p>
                  <ul>${userPosts}</ul>
                `;
              } else {
                userContainer.innerHTML = '';
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

   