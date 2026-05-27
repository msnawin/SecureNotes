package com.secure.notes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotesApplication {

	public static void main(String[] args) {

        SpringApplication.run(NotesApplication.class, args);
        System.out.println("Secure Notes Application using Spring Security");
	}

}
