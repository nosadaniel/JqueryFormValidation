$(document).ready(function(){
	var DOMAIN = "http://localhost/tabor_inventory/public_html";
	$('#register_user').submit(function(){
		var status=status1=status2=status3=status4=status5 = false;
		var name = $('#user_name');
		var email = $('#email_add');
		var pass1 = $('#password1');
		var pass2 = $('#password2');
		var usertype = $('#user_type');
		var gender = $('#gender');
		var name_err = $('#name_err');
		var email_err = $('#email_err');
		var pass1_err = $('#p1_err');
		var pass2_err = $('#p2_err');
		var t_err = $('#type_err');
		var gen_err = $('#gender_err');

		//plus(+)means combination of letters
		//i means Case insensitive
		var namePattern = new RegExp(/^[A-Za-z ]+$/);
		//nosa@gmail.com
		//* means zero or more occurence
		var emailPattern = new RegExp(
			/^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)*(\.[a-z]{2,4})$/i);
		
		if (name.val()=='' || name.val().length<6){
			name.addClass('border-danger');
			name_err.html("<span class='text-danger'>Please enter your name and it should be more than 6 characters long.<span>");
			status = false;
		}
		else if(!namePattern.test(name.val())){
			name.addClass('border-danger');
			name_err.html("<span class='text-danger'>Invalid character(s) entered...Only alphabets and space are allowed<span>");
			status = false;	
		}
		else{
			name.removeClass('border-danger');
			name_err.html('');
			status = true;
		}

		if (email.val()==""){
			email.addClass('border-danger');
			email_err.html("<span class='text-danger'>Please Enter a Valid Email Address<span>");
			status1 = false;
		}
		else if(!emailPattern.test(email.val())){
			email.addClass('border-danger');
			email_err.html("<span class='text-danger'>Invalid email address...Please try again.<span>");
			status1 = false;	
		}
		else{
			email.removeClass('border-danger');
			email_err.html('');
			status1 = true;
		}
		if(pass1.val().length==''){
			pass1.addClass('border-danger');
			pass1_err.html("<span class='text-danger'>Please Enter your Password.</span>");
			status2 = false;
		}
		else if( pass1.val().length<=7){
			pass1.addClass('border-danger');
			pass1_err.html("<span class='text-danger'>Password Should be 8 digits.</span>");
			status2 = false;
		}
		else{
			pass1.removeClass('border-danger');
			pass1_err.html('');
			status2 = true;
		}
		if(pass2.val().length==''){
			pass2.addClass('border-danger');
			pass2_err.html("<span class='text-danger'>Please Enter your Password.</span>");
			status3 = false;
		}
		else if( pass2.val().length<=7){
			pass2.addClass('border-danger');
			pass2_err.html("<span class='text-danger'>Password Should be 8 digits.</span>");
			status3 = false;
		}
		else if(pass2.val()!=pass1.val()){
			pass2.addClass('border-danger');
			pass2_err.html("<span class='text-danger'>Password Do not Match...Please Try Again. </span>");
			status3 = false;

		}
		else{
			pass2.removeClass('border-danger');
			pass2_err.html('');
			status3 = true;
		}
		if(usertype.val()==""){
			usertype.addClass('border-danger');
			t_err.html("<span class='text-danger'>Please choose a user</span>");
			status4 = false;
		}
		else{
			usertype.removeClass('border-danger');
			t_err.html("");
			status4 = true;
		}
		if(gender.val()==""){
			gender.addClass('border-danger');
			gen_err.html("<span class='text-danger'>Select your gender</span>");
			status5 = false;
		}
		else{
			gender.removeClass('border-danger');
			gen_err.html("");
			status5 = true;
		}
		
		if(status==true && status1==true && status2==true && status3==true && status4==true && status5==true){
			$.ajax({
				url:DOMAIN+'/ajax/process.php',
				method:'POST',
				data:$('#register_user').serialize(),
				success: function(data){
					if(data=="EMAIL ALREADY EXIST"){
						alert("It Seem that your Email is already in used");
					}
					else if(data=="SOME ERROR CAME UP."){
						alert("Sometime went wrong...Our developers are working on it.");
					}
					else{
						window.location.href = encodeURI(DOMAIN+"/dashboard.php?msg=user has been successfully registered.");
					}
				}
			})
		}
	});
});