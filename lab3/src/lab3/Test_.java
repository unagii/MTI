package lab3;

import static org.junit.Assert.*;

import org.junit.Test;;

public class Test_ {

	private Client client;
	private static final double DELTA = 0.01;
	
	
	public Test_(){
		client = new Client("Иван","Иванов");
	
	}
	
	
	@Test
	public void testANNUITY(){
		
		client.takeCredit(10000,6,15,"ANNUITY");
		assertEquals("Аннуитентный платеж",1740,client.getPaymentSum(1),DELTA);
		
	}
	
	
	@Test
	public void testDIFFERENTIATED(){
		
		client.takeCredit(10000,6,15,"DIFFERENTIATED");
		assertEquals("Дифференцированный платеж",1791.7,client.getPaymentSum(1),DELTA);
		
	}
	
	@Test
	public void testGetName(){
			
		assertEquals("ФИО клиента","Иван Иванов",client.getName());
	}
	
	
	
}
