package lab3;

public class PaymentDifferentiated extends Payment {

	@Override
	public double payment(double ��, int i,double �,double ��) {
		// TODO Auto-generated method stub
	
		double ��=0;
		
		��=��/12/100;
		��=��/�+��*(�-i+1)*��/�;
		
		return ��;

	}

}
