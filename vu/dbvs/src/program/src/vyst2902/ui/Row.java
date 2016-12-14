package vyst2902.ui;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;


class Row {
	private ArrayList<ArrayList<String>> columns;
	private Integer[] columnWidths;
	private RowType type;
	
	public Row(){
		columns = new ArrayList<>();
	}
	
	public void setWidths(Integer[] w){
		columnWidths = w;;
	}
	
	public Integer[] getColumnWidths(){
		return columnWidths;
	}
	
	public void setRowType(RowType t){
		type = t;
	}
	
	public void addColumn(String s){
		ArrayList<String> list = new ArrayList<>();
		list.add(s);
		columns.add(list);
	}
	
	public void normalize(){
		int numberOfParts = 1;
		for(int i = 0; i < columnWidths.length; i++){
			String col = columns.get(i).get(0);
			int w = columnWidths[i];
			int x = col.length() / w;
			if(col.length() % w != 0)
				x++;
			if(x > numberOfParts)
				numberOfParts = x;
		}
		for(int i = 0; i < columnWidths.length; i++){
			String col = columns.get(i).get(0);
			int w = columnWidths[i];
			col = col.replace("\n", ""); // to fix some breaks
			String[] parts = col.split("(?<=\\G.{"+w+"})");
			ArrayList<String> allParts = new ArrayList<>();
			int linesBefore = (numberOfParts-parts.length) / 2;
			int linesAfter = numberOfParts-parts.length-linesBefore;
			String emptyLine = StringUtils.repeat(" ", w);
			for(int j = 0; j < linesBefore; j++)
				allParts.add(emptyLine);
			
			for(int j = 0; j < parts.length; j++)
				allParts.add(parts[j]);
			
			for(int j = 0; j < linesAfter; j++)
				allParts.add(emptyLine);
			
			columns.get(i).clear();
			columns.get(i).addAll(allParts);
		}
	}
	
	@Override
	public String toString(){
		StringBuilder sb = new StringBuilder();
		if(type == RowType.HEADER){
			/*
			  +-------+-------+-------+
			 / NAME1 / NAME2 / NAME3 /|
			+-------+-------+-------+ |
			*/
			sb.append("  +");
			for(int i = 0; i < columns.size(); i++){
				for(int j = 0; j < columnWidths[i]+2; j++)
					sb.append('-');
				sb.append('+');
			}
			sb.append("\n /");
			for(int i = 0; i < columns.size(); i++){
				sb.append(' ');
				sb.append(StringUtils.center(columns.get(i).get(0), columnWidths[i], ' ')); // we assume the column names are never going to be too long
				sb.append(" /");
			}
			sb.append("|\n+");
			for(int i = 0; i < columns.size(); i++){
				for(int j = 0; j < columnWidths[i] + 2; j++)
					sb.append('-');
				sb.append('+');
			}
			sb.append(" |");
			return sb.toString();
		}
		if(type == RowType.REGULAR){
			/*
				|       | long1 |       | |
				| val11 | 2long | val13 | |
				|       | 12    |       |/|
				+-------+-------+-------+ |
				
			 */
			int h = getHeight();
			for(int i = 0; i < h; i++){
				for(int j = 0;j < columns.size(); j++){
					sb.append("| ");
					sb.append(StringUtils.rightPad(columns.get(j).get(i), columnWidths[j]));
					sb.append(' ');
				}
				sb.append('|');
				if(i == h-1)
					sb.append('/');
				else
					sb.append(' ');
				sb.append("|\n");
			}
			for(int i = 0; i < columns.size(); i++){
				sb.append('+');
				for(int j = 0; j < columnWidths[i]+2; j++)
					sb.append('-');
			}
			sb.append("+ |");
			return sb.toString();
		}
		/*
		 	| long4 |       |       | |
			| 1long |       |       | |
			| 41lon | val42 | long4 | |
			| g41lo |       | 3long | |
			| ng41l |       |       | |
			| ong41 |       |       |/ 
			+-------+-------+-------+  
		 */
		int h = getHeight();
		for(int i = 0; i < h; i++){
			for(int j = 0;j < columns.size(); j++){
				sb.append("| ");
				sb.append(StringUtils.rightPad(columns.get(j).get(i), columnWidths[j]));
				sb.append(' ');
			}
			sb.append('|');
			if(i == h-1)
				sb.append('/');
			else
				sb.append(" |\n");
		}
		sb.append('\n');
		for(int i = 0; i < columns.size(); i++){
			sb.append('+');
			for(int j = 0; j < columnWidths[i]+2; j++)
				sb.append('-');
		}
		sb.append('+');
		return sb.toString();
	}
	
	private int getHeight(){
		int mx = 1;
		for(int i = 0; i < columns.size(); i++)
			if(columns.get(i).size() > mx)
				mx = columns.get(i).size();
		return mx;
	}
}
