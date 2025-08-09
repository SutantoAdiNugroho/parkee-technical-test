public class SingleLinkedList {
    Node head;

    public SingleLinkedList() {
        this.head = null;
    }

    public void insertAtEnd(int newData) {
        Node newNode = new Node(newData);
        if (head == null) {
            head = newNode;
            return;
        }

        Node currentNode = head;
        while (currentNode.next != null) {
            currentNode = currentNode.next;
        }
        currentNode.next = newNode;
    }

    public void insertAtBeginning(int newData) {
        Node newNode = new Node(newData);
        newNode.next = head;
        head = newNode;
    }

    public void deleteByValue(int deleteData) {
        if (head == null)
            return;

        if (head.data == deleteData) {
            head = head.next;
            return;
        }

        Node currentNode = head;
        while (currentNode.next != null && currentNode.next.data != deleteData) {
            currentNode = currentNode.next;
        }

        if (currentNode.next != null) {
            currentNode.next = currentNode.next.next;
        }
    }

    public void display() {
        Node currentNode = head;

        if (currentNode == null) {
            System.out.println("No data");
        }

        while (currentNode != null) {
            System.out.println(currentNode.data + " ");
            currentNode = currentNode.next;
        }
    }

    public static void main(String[] args) {
        SingleLinkedList list = new SingleLinkedList();

        System.out.println("Executing insertAtEnd..");
        list.insertAtEnd(1);
        list.insertAtEnd(2);
        list.insertAtEnd(3);
        list.display();

        System.out.println("\nExecuting insertAtBeginning..");
        list.insertAtBeginning(0);
        list.display();

        System.out.println("\nExecuting deleteByValue..");
        list.deleteByValue(2);
        list.display();
    }
}