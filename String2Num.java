
public class String2Num {
		// This method returns an integer value for the string entered.
		// Input value is hard coded 
		static int toNumber(String num){
	        char[] digits = num.toCharArray();
	        int number = 0;
	        for(char ch:digits){
	            number = number*10+Character.getNumericValue(ch);
	        }
	        return number;
	}	
	public static void main(String[] args) {
		
			if (args.length ==1){
			System.out.println("Converting a string to number:"+ toNumber(args[0]));
		}else {
			System.out.println("Converting a string to number:"+ toNumber("jknsvjnkjc"));
		}
	}
}
