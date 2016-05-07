package lab3;

public class PaymentDifferentiated extends Payment {

	@Override
	public double payment(double Кр, int i,double т,double ст) {
		// TODO Auto-generated method stub
	
		double Пл=0;
		
		ст=ст/12/100;
		Пл=Кр/т+Кр*(т-i+1)*ст/т;
		
		return Пл;

	}

}
