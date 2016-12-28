package vyst2902;

import java.sql.SQLException;
import vyst2902.ui.UI;

public class Main {
	public static void main(String[] args) {
		try {
			new UI("studentu", "vyst2902", "vyst2902").start();
		} catch (ClassNotFoundException | SQLException e) {
			System.out.println("Connection failed.");
			e.printStackTrace();
		}
	}
}
