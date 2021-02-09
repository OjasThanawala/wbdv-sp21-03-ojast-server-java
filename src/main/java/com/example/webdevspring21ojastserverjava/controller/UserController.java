package com.example.webdevspring21ojastserverjava.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import com.example.webdevspring21ojastserverjava.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    static List<User> users = new ArrayList<User>();
    static {
        users.add(new User(123, "alice", "abc", "Alice", "Lovelace", "Faculty"));
        users.add(new User(234, "bob", "abc", "Bob", "Dillon", "Faculty"));
        users.add(new User(345, "charlie", "abc", "Charlie","Puth", "Faculty"));
        users.add(new User(456, "dan", "abc", "Dan", "Blitz",  "Faculty"));

    }
    @GetMapping("/users")

    public List<User> findAllUsers(){
        return users;
    }

    @PostMapping("/users")

    public List<User> createUser(@RequestBody User user){
        users.add(user);
        return users;
    }

}
