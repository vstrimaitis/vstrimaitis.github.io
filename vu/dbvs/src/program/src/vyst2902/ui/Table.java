package vyst2902.ui;

import java.security.InvalidParameterException;
import java.util.ArrayList;

class Table {
	private final int MAX_COLUMN_WIDTH;
	private ArrayList<Row> rows;
	private Integer[] columnWidths;
	private boolean hasBeenNormalized;
	
	public Table(int maxColumnWidth, Integer[] columnWidths){
		MAX_COLUMN_WIDTH = maxColumnWidth;
		rows = new ArrayList<>();
		this.columnWidths = columnWidths;
	}
	
	public void addRow(Row r){
		Integer[] w = r.getColumnWidths();
		if(w.length != columnWidths.length)
			throw new InvalidParameterException("The supplied row has an invalid number of columns for this table");
		for(int i = 0; i < w.length; i++){
			if(w[i] > columnWidths[i] && w[i] <= MAX_COLUMN_WIDTH)
				columnWidths[i] = w[i];
		}
		if(rows.size() == 0)
			r.setRowType(RowType.HEADER);
		else if(rows.size() == 1)
			r.setRowType(RowType.FOOTER);
		else{
			rows.get(rows.size()-1).setRowType(RowType.REGULAR);
			r.setRowType(RowType.FOOTER);
		}
		rows.add(r);
	}
	
	private void normalize(){
		if(hasBeenNormalized)
			return;
		for(int i = 0; i < rows.size(); i++)
		{
			rows.get(i).setWidths(columnWidths);
			rows.get(i).normalize();
		}
		hasBeenNormalized = true;
	}
	
	private String getNoResultsSign(){
		return  "    _   __                              ____      \n" + 
				"   / | / /___     ________  _______  __/ / /______\n" + 
				"  /  |/ / __ \\   / ___/ _ \\/ ___/ / / / / __/ ___/\n" + 
				" / /|  / /_/ /  / /  /  __(__  ) /_/ / / /_(__  ) \n" + 
				"/_/ |_/\\____/  /_/   \\___/____/\\__,_/_/\\__/____/  ";
	}
	
	@Override
	public String toString(){
		if(rows.size() <= 1)
			return getNoResultsSign();
		normalize();
		StringBuilder sb = new StringBuilder();
		for(Row r : rows){
			sb.append(r.toString());
			sb.append('\n');
		}
		return sb.toString();
	}
}
