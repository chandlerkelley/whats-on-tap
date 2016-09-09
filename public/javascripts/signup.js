angular.module("whatsOnTap")
.component("signup", {
	template: `
	<main>
		<form name="form" ng-submit="$ctrl.signup(form)" novalidate>
			<div class="form-part">
				<label class="form-label">Email</label>
				<input type="email" name="email" ng-model="$ctrl.user.email" ng-blur="$ctrl.emailBlur = true" required mongoose-error>
			</div>
			<p ng-show="form.email.$error.required && $ctrl.emailBlur">What's your email?</p>
			<p ng-show="form.email.$error.email && $ctrl.emailBlur">That doesn't look like a valid email</p>
			
			<div class="form-part">
				<label class="form-label">Password</label>
				<input type="password" name="password" ng-model="$ctrl.user.password" ng-blur="$ctrl.passwordBlur = true" ng-minlength="6" required>
			</div>
			<p ng-show="(form.password.$error.required || form.password.$error.minlength) && $ctrl.passwordBlur">Password must contain at least 6 characters</p>
			
			<div class="form-part">
				<label>Confirm Password</label>
				<input type="password" name="passwordCheck" ng-model="$ctrl.user.passwordCheck" ng-blur="$ctrl.passwordCheckBlur = true" match="$ctrl.user.password" required>
			</div>
			<p ng-show="form.passwordCheck.$error.match && $ctrl.passwordCheckBlur">Passwords must match</p>

			<button class="btn form-button" type="submit">Register</button>
		</form>
	</main>
	`,
	controller: function(Auth, $state, toastr) {

		this.signup = function(form) {
			this.submitted = true;

			return Auth.createUser({
				email: this.user.email,
				password: this.user.password
			})
			.then(() => {
				$state.go("home");
			})
			.catch( err => {
				console.log(err);
				toastr.error("Something went wrong");
			})
		}
	}
})

