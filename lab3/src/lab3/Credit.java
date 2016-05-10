package lab3;

//коментарий.

public class Credit  {

	private int T=24;
	private double St=19;
	private	double Kr;
	
	private Payment payment; 
	private enum PaymentType {DIFFERENTIATED, ANNUITY}
	
	
	public Credit(double credisSum,int months,double rate, String type){
		Kr=credisSum;	//сумма кредита
		T=months;		//количество периодов оплаты
		St=rate;		//процентная ставка, начисляемая на задолженность за период
				
		
		if (PaymentType.ANNUITY == PaymentType.valueOf(type)) payment = new PaymentAnnuity();
		if (PaymentType.DIFFERENTIATED == PaymentType.valueOf(type)) payment = new PaymentDifferentiated();
	}
	
	public  double payment(int i){
		
		
		return payment.payment(Kr, i, T, St);
		
	}


	
}
