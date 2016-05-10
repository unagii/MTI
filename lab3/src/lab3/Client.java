package lab3;

public class Client {

	private String firstName;
	private String lastName;

	Credit credit;
	
	public void Client(String firstName_,String lastName_) {
		firstName=firstName_;
		lastName=lastName_;
		

	}
	
	public  void takeCredit(double credisSum,int months,double rate, String type){
		
		credit= new Credit(credisSum,months,rate,type);
		
	}
	
	public double getPaymentSum(int month) {
		
		return credit.payment(month);
	}
	
}
