package lab3;

public class PaymentAnnuity extends Payment {

	@Override
	public double payment(double Кр, int i,double т,double ст) {
		// TODO Auto-generated method stub
		double Пл=0;
		
		ст=ст/12/100;
		Пл=Кр*ст/(1-1/Math.pow(1+ст,т));
		
		return Пл;
	}

}
