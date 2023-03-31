import './App.css'
import { Button, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext'
import Container from 'react-bootstrap/Container'
import BudgetModal from './Components/budgetModal/BudgetModal'
import ExpenseModal from './Components/expenseModal/ExpenseModal'
import BudgetCard from './Components/budgetCard/BudgetCard'
import UncategorizedBudgetCard from './Components/uncategorizedBudgetCard/UncategorizedBudgetCard'
import TotalBudgetCard from './Components/totalBudgetCard/TotalBudgetCard'
import ViewExpensesModal from './Components/viewExpensesModal/ViewExpensesModal'

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [expenseModalBudgetId, setExpenseModalBudgetId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

  function openExpenseModal(budgetId) {
     setShowExpenseModal(true)
     setExpenseModalBudgetId(budgetId)
  }

  return (
  <>
    <Container className='my-4 appContainer'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick={()=> setShowBudgetModal(true)}>Add Budget</Button>
        <Button variant='outline-primary' onClick={openExpenseModal}>Add Expense</Button>
      </Stack>
      <div style={{
        display:'grid', 
        gridAutoColumns:'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1rem',
        alignItems: 'flex-start',
      }}>
        {budgets.map(budget =>{
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount, 
            0 
          )
          return (
          <BudgetCard 
            key={budget.id}
            name={budget.name}
            amount={amount} 
            max={budget.max}
            onAddExpenseClick={()=> openExpenseModal(budget.id)}
            onViewExpensesClick={()=> setViewExpensesModalBudgetId(budget.id)}
            />
          )
          })}
          <UncategorizedBudgetCard 
          onAddExpenseClick={openExpenseModal}
          onViewExpensesClick={()=> 
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>  
    </Container>
    <BudgetModal 
      show={showBudgetModal} 
      handleClose={()=> setShowBudgetModal(false)} 
    />
    <ExpenseModal 
      show={showExpenseModal}
      defaultBudgetId={expenseModalBudgetId}
      handleClose={()=> setShowExpenseModal(false)}
    /> 
      <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId}
        handleClose={()=> setViewExpensesModalBudgetId()}
    /> 
  </>
  )
}

export default App
