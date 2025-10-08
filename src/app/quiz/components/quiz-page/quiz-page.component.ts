import { Component, inject, OnInit } from '@angular/core';
import { Answer, Question, QUIZ_DATA } from '../../../data-access/consts/quiz';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TuiIcon } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  imports: [ButtonComponent, TuiIcon],
})
export class QuizPageComponent implements OnInit {
  private readonly router = inject(Router);

  public questions: Question[] = QUIZ_DATA;
  public currentQuestionIndex: number = 0;
  public selectedAnswers: { [key: number]: Answer } = {};
  public quizCompleted: boolean = false;

  public ngOnInit(): void {}

  public get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  public get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  public selectAnswer(answer: Answer): void {
    this.selectedAnswers[this.currentQuestion.id] = answer;
  }

  public isAnswerSelected(answer: Answer): boolean {
    return this.selectedAnswers[this.currentQuestion.id]?.id === answer.id;
  }

  public nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.completeQuiz();
    }
  }

  public prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  public completeQuiz(): void {
    this.quizCompleted = true;
  }

  public restartQuiz(): void {
    this.router.navigate([`/catalog/a58d54b6-25ea-4818-afc9-1faa8c630d9a`], {
      queryParams: {
        diameter: '50',
        gost: 'GOST 8732',
        steelGrade: 'Ст5',
      },
    });
  }

  public hasSelectedAnswer(): boolean {
    return !this.selectedAnswers[this.currentQuestion.id];
  }
}
