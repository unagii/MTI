package lab3;

public class Credit  {

	private double �=24;
	private double ��=19;


	public Credit(){
		
	}
	
	
	public double paymentDifferentiated (double �� ,int i){
		double ��=0;
		
		��=��/12/100;
		��=��/�+��*(�-i+1)*��/�;
		
		return ��;
	}


	double paymentAnnuity(double ��) {
		double ��=0;
		
		��=��/12/100;
		��=��*��/(1-1/Math.pow(1+��,�));
		
		return ��;
	}
    
	public  double payment(double ��, int i,boolean type){
		if (type) return new PaymentDifferentiated().payment(��, i, �, ��);
		else return new PaymentAnnuity().payment(��, i, �, ��);
	}


	
}
