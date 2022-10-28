import moment from "moment";

// Calculates the age from a date
// https://helpdesk.castoredc.com/en_US/date-and-time-difference-templates/calculate-the-age-using-a-year-or-year-and-month-variable#:~:text=Calculate%20the%20age%20using%20a%20text%20field,-If%20you%20are&text=calculate%20the%20age%3A-,var%20a%20%3D%20moment()%3B%20var%20b%20%3D%20moment('%7Bdem_pat_birthyear%7D',b))%3B%20var%20years%20%3D%20age.
export const calculateAge = (date) => {
	const currTime = moment();
	const puppersBirthday = moment(date);
	const age = moment.duration(currTime.diff(puppersBirthday));
	const years = age.years();
	const months = age.months();

	return [years, months];
}