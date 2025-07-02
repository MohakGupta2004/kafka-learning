import { Admin, Kafka, Message, Producer } from 'kafkajs';


export class KafkaConfig {
  private producers: Producer;
  private admin: Admin;
  private kafka: Kafka;

  constructor(brokers: string[]) {
    this.kafka = new Kafka({
      clientId: "kafka-learning",
      brokers: brokers
    })

    this.admin = this.kafka.admin()
    this.producers = this.kafka.producer()
  }

  async connect() {
    try {
      this.producers.connect()
      this.admin.connect()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createTopic(topic: string) {
    try {
      if (!(await this.admin.listTopics()).includes(topic)) {
        this.admin.createTopics({
          topics: [{ topic }],
        })
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async produceMessage(topic: string, messages: Message[]) {
    try {
      this.producers.send({
        topic,
        messages
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
