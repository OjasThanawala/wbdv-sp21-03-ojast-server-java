(function () {

    var $usernameFld
    var $passwordFld
    var $firstNameFld
    var $lastNameFld
    var $roleFld
    var $removeBtn
    var $editBtn
    var $updateBtn
    var $createBtn
    var $tbody

    // var users = [];


    var userService = new AdminUserServiceClient();

    function clearInput() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld.val("FACULTY")
    }

    function createUser() {
        var user = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }
        console.log(user)

        userService.createUser(user)
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
                clearInput()
            })
    }

    function deleteUser(event) {
        const delete_user = $(event.target);
        const userIndex = delete_user.attr("id");
        const userClass = delete_user.attr("class");
        const userId = users[userIndex]._id;

        userService.deleteUser(userId)
            .then(function (status) {
                users.splice(userIndex, 1)
                renderUsers(users)
            })
    }

    var selectedUser = null
    function selectUser(event) {
        var select_user = $(event.target)
        var userID = select_user.attr("id")
        selectedUser = users.find(user => user._id === userID)
        $usernameFld.val(selectedUser.username)
        $passwordFld.val(selectedUser.password)
        $firstNameFld.val(selectedUser.firstName)
        $lastNameFld.val(selectedUser.lastName)
        $roleFld.val(selectedUser.role)
    }


    function updateUser() {
        selectedUser.username = $usernameFld.val()
        selectedUser.password = $passwordFld.val()
        selectedUser.firstName = $firstNameFld.val()
        selectedUser.lastName = $lastNameFld.val()
        selectedUser.role = $roleFld.val()
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                console.log(status)
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
                clearInput()
            })
    }


    function renderUsers(users) {
        $tbody.empty()
        for (var u = 0; u < users.length; u++) {
            var user = users[u]
            $tbody.prepend(`
          <tr>
              <td>${user.username}</td>
<!--              <td>${user.password}</td>-->
              <td></td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.role}</td>
              <td>
                  <span class="float-right">
                      <i id="${u}" class="fa-2x fa fa-times wbdv-remove"></i>
                      <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>                  
                </span>
              </td>
          </tr>
          `)
        }
        $(".wbdv-remove")
            .click(deleteUser)

        $(".wbdv-edit")
            .click(selectUser)

    }

    function main() {
        $createBtn = $('.wbdv-create');
        $tbody = $(".wbdv-tbody")
        $updateBtn = $(".wbdv-update")
        $usernameFld = $("#wbdv-usernameFld")
        $passwordFld = $("#wbdv-passwordFld")
        $firstNameFld = $("#wbdv-firstNameFld")
        $lastNameFld = $("#wbdv-lastNameFld")
        $roleFld = $("#wbdv-roleFld")
        $removeBtn = $(".wbdv-remove")
        $editBtn = $(".wbdv-edit")


        $updateBtn.click(updateUser)
        $createBtn.click(createUser)


        userService.findAllUsers()
            .then(function (actualUsersServer) {
                users = actualUsersServer
                renderUsers(users)
            })
    }

    $(main);
})()