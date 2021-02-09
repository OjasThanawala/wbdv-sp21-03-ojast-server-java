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
    var $clearBtn

    var users = [];


    var userService = new AdminUserServiceClient();

    function clearInput() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        // $roleFld.val("FACULTY")
    }

    function createUser(user) {
        userService.createUser(user)
            .then(function (actualUser) {
                users.push(actualUser)
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

    function selectUser(event) {
        $usernameFld.val(selectedUser.username)
        $passwordFld.val(selectedUser.password)
        $firstNameFld.val(selectedUser.firstName)
        $lastNameFld.val(selectedUser.lastName)
        $roleFld.val(selectedUser.role)
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)

            })
        clearInput()

    }


    function renderUsers(users) {
        $tbody.empty()
        for (var u = 0; u < users.length; u++) {
            var user = users[u]
            $tbody.prepend(`
          <tr>
              <td>${user.username}</td>
              <td>${user.password}</td>
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
        // rowTemplate = jQuery('.wbdv-template');
        $createBtn = $('.wbdv-create');
        $tbody = $(".wbdv-tbody")
        $updateBtn = $(".wbdv-update")
        $clearBtn = $(".btn")
        $usernameFld = $(".wbdv-usernameFld")
        $passwordFld = $(".wbdv-passwordFld")
        $firstNameFld = $(".wbdv-firstNameFld")
        $lastNameFld = $(".wbdv-lastNameFld")
        $roleFld = $(".wbdv-roleFld")
        $removeBtn = $(".wbdv-remove")
        $editBtn = $(".wbdv-edit")

        $clearBtn.click(clearInput)
        // $updateBtn.click(updateUser)
        $createBtn.click(() => {
            createUser({
                username: $usernameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstNameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val()
            })
            clearInput()
        })
        // $removeBtn.click(removeUser)
        // $editBtn.click(editUser)


        userService.findAllUsers()
            .then(function (actualUsersServer) {
                users = actualUsersServer
                renderUsers(users)
            })
    }

    $(main);
})()