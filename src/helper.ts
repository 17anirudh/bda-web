import type { ComponentType } from "react";
import {
  HouseIcon,
  CpuIcon,
  FileDigitIcon,
  DatabaseIcon,
  LeafyGreenIcon,
  StickyNoteIcon,
  HistoryIcon,
} from "lucide-react";

interface NavType {
  display: string;
  icon: ComponentType | undefined;
  path: string;
  shortcut: string;
}
interface DescType {
  display: string;
  description: string;
  path: string;
}
interface HadoopImages {
  src: string;
  alt: string;
}

export const hadoopImages: HadoopImages[] = [
  {
    src: "https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/images/hdfsarchitecture.png",
    alt: "HDFS Architecture",
  },
  {
    src: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200820173200/secondary-namenode.png",
    alt: "Secondary NameNode",
  },
  {
    src: "https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/images/hdfsdatanodes.png",
    alt: "Data Replication",
  },
];

export const navItems: NavType[] = [
  {
    display: "Home",
    icon: HouseIcon,
    path: "/",
    shortcut: "Alt+0",
  },
  {
    display: "1-Big data",
    icon: FileDigitIcon,
    path: "/bigdata",
    shortcut: "Alt+1",
  },
  {
    display: "2-NoSQL",
    icon: DatabaseIcon,
    path: "/nosql",
    shortcut: "Alt+2",
  },
  {
    display: "3-Hadoop",
    path: "/hadoop",
    shortcut: "Alt+3",
    icon: LeafyGreenIcon,
  },
  {
    display: "4-Hive",
    path: "/hive",
    shortcut: "Alt+4",
    icon: undefined,
  },
  {
    display: "5-Spark",
    path: "/spark",
    shortcut: "Alt+5",
    icon: undefined,
  },
  {
    display: "6-Complex Types",
    path: "/complex",
    shortcut: "Alt+6",
    icon: undefined,
  },
  {
    display: "7-Spark Tuning",
    path: "/tuning",
    shortcut: "Alt+7",
    icon: CpuIcon,
  },
  {
    display: "Syllabus",
    path: "/syllabus",
    shortcut: "Alt+8",
    icon: StickyNoteIcon,
  },
  {
    display: "PYQs",
    path: "/pyq",
    shortcut: "Alt+9",
    icon: HistoryIcon,
  },
];
export const descItems: DescType[] = [
  {
    display: "1-Big data",
    description: "Introduction to Big Data",
    path: "/bigdata",
  },
  {
    display: "2-NoSQL",
    path: "/nosql",
    description: "Introduction to NoSQL",
  },
  {
    display: "3-Hadoop",
    path: "/hadoop",
    description: "Data formats, analyzing data with Hadoop",
  },
  {
    display: "4-Hive",
    path: "/hive",
    description: "Introduction to Hive",
  },
  {
    display: "5-Spark",
    path: "/spark",
    description: "Apache Spark",
  },
  {
    display: "6-Complex Types",
    path: "/complex",
    description: "Working with Complex Types",
  },
  {
    display: "7-Spark Tuning",
    path: "/tuning",
    description: "Spark-Performance Tuning",
  },
  {
    display: "Syllabus",
    path: "/syllabus",
    description: "BDA Syllabus",
  },
  {
    display: "PYQs",
    path: "/pyq",
    description: "Previous Year Question papers",
  },
];

export function handleKeyDown(event: KeyboardEvent): void {
  if (event.altKey && event.key === "0") {
    window.location.href = "/";
  }
  if (event.altKey && event.key === "1") {
    window.location.href = "/bigdata";
  }
  if (event.altKey && event.key === "2") {
    window.location.href = "/nosql";
  }
  if (event.altKey && event.key === "3") {
    window.location.href = "/hadoop";
  }
  if (event.altKey && event.key === "4") {
    window.location.href = "/hive";
  }
  if (event.altKey && event.key === "5") {
    window.location.href = "/spark";
  }
  if (event.altKey && event.key === "6") {
    window.location.href = "/complex";
  }
  if (event.altKey && event.key === "7") {
    window.location.href = "/tuning";
  }
  if (event.altKey && event.key === "8") {
    window.location.href = "/syllabus";
  }
  if (event.altKey && event.key === "9") {
    window.location.href = "/pyq";
  }
}

export const map_reduce_code = `
  import java.io.IOException;
  import java.util.StringTokenizer;
  import org.apache.hadoop.conf.Configuration;
  import org.apache.hadoop.fs.Path;
  import org.apache.hadoop.io.IntWritable;
  import org.apache.hadoop.io.Text;
  import org.apache.hadoop.mapreduce.Job;
  import org.apache.hadoop.mapreduce.Mapper;
  import org.apache.hadoop.mapreduce.Reducer;
  import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
  import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

  public class WordCount {
    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>{
      private final static IntWritable one = new IntWritable(1);
      private Text word = new Text();
      public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
        StringTokenizer itr = new StringTokenizer(value.toString());
        while (itr.hasMoreTokens()) {
          word.set(itr.nextToken());
          context.write(word, one);
        }
      }
    }

    public static class IntSumReducer extends Reducer<Text,IntWritable,Text,IntWritable> {
      private IntWritable result = new IntWritable();
      public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        int sum = 0;
        for (IntWritable val : values) {
          sum += val.get();
        }
        result.set(sum);
        context.write(key, result);
      }
    }

    public static void main(String[] args) throws Exception {
      Configuration conf = new Configuration();
      Job job = Job.getInstance(conf, "word count");
      job.setJarByClass(WordCount.class);
      job.setMapperClass(TokenizerMapper.class);
      job.setCombinerClass(IntSumReducer.class);
      job.setReducerClass(IntSumReducer.class);
      job.setOutputKeyClass(Text.class);
      job.setOutputValueClass(IntWritable.class);
      FileInputFormat.addInputPath(job, new Path(args[0]));
      FileOutputFormat.setOutputPath(job, new Path(args[1]));
      System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
  }`;
