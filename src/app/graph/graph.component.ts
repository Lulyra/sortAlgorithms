import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('mainGraph')
  myCanvas: ElementRef<HTMLCanvasElement> | undefined;

  data: number[] | undefined;
  isSorted = false;
  isRunning = false;
  shouldStop = false;
  lastSortedTerm: number | undefined;

  public context: CanvasRenderingContext2D | null | undefined;

  async ngAfterViewInit(): Promise<void> {
    this.context = this.myCanvas?.nativeElement.getContext('2d');

    this.data = this.createData();
    this.createGraph(this.data);
  }

  createData(): number[] {
    const result = [];
    for (let i = 0; i < 80; i++) {
      result.push(this.generateAnNumber(30, 500));
    }
    return result;
  }

  createGraph(initialData?: number[], color = 'white', movedTerm?: number) {
    this.context?.clearRect(0, 0, 1000, 1000);
    const width = 10;
    const gap = 2;
    const verticalPosition = 495;
    let horizontalPosition = 10;

    const cleanData = this.cleanData(initialData!);

    
    for (let i = 0; i < cleanData.length; i++) {

      if (i - 1 === movedTerm) {
        this.context!.fillStyle = 'green';
      } else {
        this.context!.fillStyle = color;
      }
      this.context?.fillRect(
        horizontalPosition,
        verticalPosition,
        width,
        -cleanData[i]
      );
      horizontalPosition += width + gap;
    }
  }
  async startBubbleSort() {
    console.log('start');
    this.lastSortedTerm = this.data!.length - 1;
    await this.animate();
  }

  cleanData(data: number[]) {
    const max = Math.max(...data);
    const min = Math.min(...data);

    const minValue = 0.02 * max;

    const newData = data.map((item: number) => {
      return ((item - min) / (max - min)) * 480 < minValue
        ? minValue
        : ((item - min) / (max - min)) * 480;
    });

    return newData;
  }

  refresh() {
    location.reload();
  }

  async animate() {
    this.isRunning = true;
    await this.sortBubbleAlgorithm();
    if (!this.shouldStop) {
      window.requestAnimationFrame(() => this.animate());
      this.lastSortedTerm = this.lastSortedTerm! - 1;
    } else {
      this.createGraph(this.data, '#99ff99');
      this.isRunning = false;
      console.log('stop');
    }
  }

  async sortBubbleAlgorithm() {
    if (!this.isSorted) {
      this.shouldStop = true;
      for (let i = 0; i < this.lastSortedTerm!; i++) {
        if (this.data![i] > this.data![i + 1]) {
          const temp = this.data![i];
          this.data![i] = this.data![i + 1];
          this.data![i + 1] = temp;
          this.shouldStop = false;
        }
        await this.sleep(100);
        this.createGraph(this.data, 'white', i);
      }
    }
  }

  generateAnNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
