function AdminUserServiceClient() {

    this.findAllUsers = findAllUsers;
    this.createUser = createUser;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.user_url = 'https://wbdv-generic-server.herokuapp.com/api/001857727/users';

    var self = this;

    // POST - Create
    function createUser(user) {
        // user.id = (new Date()).getTime();
        return fetch(self.user_url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json()
        })
    }

    // GET - Read
    function findAllUsers() {
        return fetch(self.user_url)
            .then(function(response){
                return response.json()
            })
    }

    function deleteUser(userId) {
        return fetch(`${self.user_url}/${userId}`, {
            method: 'DELETE'})
            .then(function (response) {
                return response.json()
            })
    }

    function updateUser(userId, user) {
        return fetch(`${self.user_url}/${userId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())

    }
}