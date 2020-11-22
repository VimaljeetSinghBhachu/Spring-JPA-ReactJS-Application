package com.vjsb.springboot.cruddemo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employee")
public class Employee {

	// define fields
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="designation")
	private String designation;
	
	@Column(name="email")
	private String email;
	
	@Column(name="salary")
	private int salary;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="resume_url")
	private String resumeUrl;
	
	@Column(name="video_url")
	private String videoUrl;
		
	// define constructors
	
	public Employee() {
		
	}
	
	public Employee(String firstName, String designation, String email, int salary, String imageUrl, String resumeUrl,
			String videoUrl) {
		super();
		this.firstName = firstName;
		this.designation = designation;
		this.email = email;
		this.salary = salary;
		this.imageUrl = imageUrl;
		this.resumeUrl = resumeUrl;
		this.videoUrl = videoUrl;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getResumeUrl() {
		return resumeUrl;
	}

	public void setResumeUrl(String resumeUrl) {
		this.resumeUrl = resumeUrl;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", designation=" + designation + ", email=" + email
				+ ", salary=" + salary + ", imageUrl=" + imageUrl + ", resumeUrl=" + resumeUrl + ", videoUrl="
				+ videoUrl + "]";
	}
	
}