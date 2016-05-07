package lab3;

public class Credit  {

	private double т=24;
	private double ст=19;


	public Credit(){
		
	}
	
	
	public double paymentDifferentiated (double Кр ,int i){
		double Пл=0;
		
		ст=ст/12/100;
		Пл=Кр/т+Кр*(т-i+1)*ст/т;
		
		return Пл;
	}


	double paymentAnnuity(double Кр) {
		double Пл=0;
		
		ст=ст/12/100;
		Пл=Кр*ст/(1-1/Math.pow(1+ст,т));
		
		return Пл;
	}
    
	public  double payment(double Кр, int i,boolean type){
		if (type) return new PaymentDifferentiated().payment(Кр, i, т, ст);
		else return new PaymentAnnuity().payment(Кр, i, т, ст);
	}


	
}
