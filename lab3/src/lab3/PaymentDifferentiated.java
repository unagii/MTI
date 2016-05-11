package lab3;

public class PaymentDifferentiated extends Payment {

	@Override
	public double payment(double Kr, int i,int T,double St) {
		// TODO Auto-generated method stub
	
		double Pl=0;
		
		St=St/12/100;
		Pl=Kr/T+Kr*(T-i+1)*St/T;
		Pl=Math.round(Pl*100);
		Pl=Pl/100;
		
		return Pl;

	}

}
