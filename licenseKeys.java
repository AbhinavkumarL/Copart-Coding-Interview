/**
 * Program to convert the given string to  license Format
 * @author Abhinav
 *
 */
import java.lang.Integer;

public class licenseKeys {
	//Using string builder to return formated string
	static StringBuilder format(String str , int k){
//		int k = Integer.parseInt(n);
		char [] array = str.toUpperCase().toCharArray(); // convert to char array
		StringBuilder sb = new StringBuilder();
		
		for ( int i=array.length-1; i>=0; i-- ){    // looping the array in reverse order
			if ( array[i]=='-'){
				continue;
			}else {
				
				sb.append(array[i]);
				if (i%k==0){				//appending '-' after every 4 letters
					sb.append('-');
				}
			}
		}
		sb.reverse();
		sb.deleteCharAt(0);
		return sb;
	}

	public static void main(String[] args) {
		

		if (args.length == 2){
		System.out.println("Converting a string to number:"+ format(args[0], Integer.parseInt(args[1])));
	}else {
		System.out.println("Converting a string to number:"+ format("jsnnva332jnj",4));
	}
	}

}
