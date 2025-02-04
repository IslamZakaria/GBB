import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
import { Routes, RouterOutlet, RouterLink, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  template: `
    <div class="container">
      <h1>Charts Dashboard</h1>
      
      <div class="charts-grid">
        <div class="chart-container">
          <h2>Stacked Bar Chart</h2>
          <div class="chart-wrapper">
            <canvas id="stackedBarChart"></canvas>
          </div>
        </div>

        <div class="chart-container">
          <h2>Line Chart</h2>
          <div class="chart-wrapper">
            <canvas id="lineChart"></canvas>
          </div>
        </div>

        <div class="chart-container">
          <h2>Donut Chart</h2>
          <div class="chart-wrapper">
            <canvas id="donutChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChartsComponent implements OnInit {
  ngOnInit() {
    this.createStackedBarChart();
    this.createLineChart();
    this.createDonutChart();
  }

  createStackedBarChart() {
    const ctx = document.getElementById('stackedBarChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Progress',
            data: [90, 70, 45, 60, 30],
            backgroundColor: [
              '#FF4D00',  // Jan
              '#FF7133',  // Feb
              '#FF8D5C',  // Mar
              '#FFDBCC',  // Apr
              '#FFE5DA'   // May
            ],
            borderRadius: {
              topLeft: 4,
              topRight: 4,
              bottomLeft: 0,
              bottomRight: 0
            },
            borderSkipped: false,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'Background',
            data: [10, 30, 55, 40, 70],
            backgroundColor: '#FAFAFA',
            borderWidth: 0,
            borderRadius: {
              topLeft: 0,
              topRight: 0,
              bottomLeft: 0,
              bottomRight: 0
            },
            barPercentage: 0.3,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + 'k';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Monthly Trends',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#FF4D00',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createDonutChart() {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Orange', 'Blue', 'Off-White', 'Black'],
        datasets: [{
          data: [300, 50, 100, 200],
          backgroundColor: [
            '#FF4D00',
            '#0036FF',
            '#FFDBCC',
            '#FFBFA3'
          ],
          spacing: 2,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '85%'
      }
    });
  }
}

interface CardData {
  id: number;
  title: string;
  description: string;
  details: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cards-container">
      <h1>Cards with Details</h1>
      
      <div class="cards-grid">
        <div class="card" *ngFor="let card of currentPageCards">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
          <button class="show-more" (click)="showDetails(card)">Show More</button>
        </div>
      </div>

      <div class="pagination">
        <button 
          [disabled]="currentPage === 1"
          (click)="changePage(currentPage - 1)">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          [disabled]="currentPage === totalPages"
          (click)="changePage(currentPage + 1)">
          Next
        </button>
      </div>

      <div class="details-panel" [class.show]="selectedCard">
        <div class="details-content" *ngIf="selectedCard">
          <button class="close-button" (click)="closeDetails()">×</button>
          <h3>{{ selectedCard.title }} - Details</h3>
          <p>{{ selectedCard.details }}</p>
        </div>
      </div>
    </div>
  `
})
export class CardsComponent implements OnInit {
  cards: CardData[] = [];
  currentPage = 1;
  pageSize = 6;
  selectedCard: CardData | null = null;

  get totalPages(): number {
    return Math.ceil(this.cards.length / this.pageSize);
  }

  get currentPageCards(): CardData[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.cards.slice(startIndex, startIndex + this.pageSize);
  }

  ngOnInit() {
    // Simulate loading data
    this.cards = Array(20).fill(null).map((_, index) => ({
      id: index + 1,
      title: `Card ${index + 1}`,
      description: `This is a brief description for card ${index + 1}`,
      details: `This is detailed information for card ${index + 1}. It contains more comprehensive information that is shown when the user clicks "Show More". You can include any additional details here that would be relevant to the user.`
    }));
  }

  changePage(page: number) {
    this.currentPage = page;
    this.closeDetails();
  }

  showDetails(card: CardData) {
    this.selectedCard = card;
  }

  closeDetails() {
    this.selectedCard = null;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/charts">Charts</a>
      <a routerLink="/cards">Cards</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App { }

const routes: Routes = [
  { path: 'charts', component: ChartsComponent },
  { path: 'cards', component: CardsComponent },
  { path: '', redirectTo: '/charts', pathMatch: 'full' }
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});