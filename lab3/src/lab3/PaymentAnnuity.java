package lab3;

public class PaymentAnnuity extends Payment {

	@Override
	public double payment(double ��, int i,double �,double ��) {
		// TODO Auto-generated method stub
		double ��=0;
		
		��=��/12/100;
		��=��*��/(1-1/Math.pow(1+��,�));
		
		return ��;
	}

}
