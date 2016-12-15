package vyst2902.ui;

import java.util.List;

import vyst2902.dataTransferObjects.*;

public class TableConverter {
	public static final int PROGRAMMING_LANGUAGE_MAX_COLUMN_WIDTH = 10;
	public static final int POST_MAX_COLUMN_WIDTH = 40;
	
	
	
	public static Table convert(Post[] posts){
		Table table = init(POST_MAX_COLUMN_WIDTH, new String[]{"Id", "Author email", "Title", "Content", "Publish date"});
		for(Post p : posts){
			Row row = new Row();
			String id = String.valueOf(p.getId());
			String authorEmail = p.getAuthorEmail();
			String title = p.getTitle();
			String content = p.getContent();
			String publishDate = p.getPublishDate().toString();
			row.addColumn(id);
			row.addColumn(authorEmail);
			row.addColumn(title);
			row.addColumn(content);
			row.addColumn(publishDate);
			row.setWidths(new Integer[]{id.length(), authorEmail.length(), title.length(), content.length(), publishDate.length()});
			table.addRow(row);
		}
		return table;
	}
	
	public static Table convert(Comment[] comments){
		Table table = init(POST_MAX_COLUMN_WIDTH, new String[]{"Id", "Author email", "Content", "Publish date"});
		for(Comment p : comments){
			Row row = new Row();
			String id = String.valueOf(p.getId());
			String authorEmail = p.getAuthorEmail();
			String content = p.getContent();
			String publishDate = p.getPublishDate().toString();
			row.addColumn(id);
			row.addColumn(authorEmail);
			row.addColumn(content);
			row.addColumn(publishDate);
			row.setWidths(new Integer[]{id.length(), authorEmail.length(), content.length(), publishDate.length()});
			table.addRow(row);
		}
		return table;
	}

	private static Table init(int maxColWidth, String[] columnNames){
		Integer[] columnWidths = new Integer[columnNames.length];
		for(int i = 0; i < columnNames.length; i++)
			columnWidths[i] = columnNames[i].length();
		Table t = new Table(maxColWidth, columnWidths);
		Row row = new Row();
		for(String n : columnNames)
			row.addColumn(n);
		row.setWidths(columnWidths);
		t.addRow(row);
		return t;
	}
}
