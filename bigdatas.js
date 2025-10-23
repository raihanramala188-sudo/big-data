public class WordCount {
  // Mapper
  public static class Map extends Mapper<Object, Text, Text, IntWritable> {
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();
    public void map(Object k, Text v, Context c) throws IOException, InterruptedException {
      for (String s : v.toString().split("\\s+")) { word.set(s); c.write(word, one); }
    }
  }
  // Reducer
  public static class Reduce extends Reducer<Text, IntWritable, Text, IntWritable> {
    public void reduce(Text k, Iterable<IntWritable> vals, Context c) throws IOException, InterruptedException {
      int sum = 0; for (IntWritable v : vals) sum += v.get(); c.write(k, new IntWritable(sum));
    }
  }
}
