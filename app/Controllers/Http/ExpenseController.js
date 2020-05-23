'use strict'

const Expense = use('App/Models/Expense');

class ExpenseController {
    async index ({ request, auth, response }) {        
        const expenses = await Expense.query().whereRaw('user_id = ?', [auth.user.id]).fetch();
    
        return expenses;
    }

    async store ({ request, auth }) {
        const data = request.only(["description", "value", "category_id"]);
        const store = {
            description: data.description,
            value: data.value,
            category_id: data.category_id,
            user_id: auth.user.id
        }    
        const expense = await Expense.create(store);
    
        return expense;
      }
    
      async show ({ auth, params, response, view }) {
        const expenseOfUser = await Expense.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch().then( (expenses) => expenses.toJSON());
        
        if(typeof expenseOfUser[0] !== 'undefined') {
            const expense = await Expense.findOrFail(params.id);
            await expense.load('category')
            await expense.save();
                
            return expense;
        }
        else {
            return response.status(403).send('Área não autorizada');
        }
      }
    
      async update ({ auth, params, response, request }) {
        const expenseOfUser = await Expense.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch().then( (expenses) => expenses.toJSON());
        
        if(typeof expenseOfUser[0] !== 'undefined') {
            const data = request.only(['name']);
            const expense = await Expense.findOrFail(params.id);

            await expense.merge(data);
            await expense.save();
                
            return expense;
        }
        else {
            return response.status(403).send('Área não autorizada');
        }
      }
    
      async destroy ({ auth, params, response, request }) {    
          const expenseOfUser = await Expense.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch().then( (expenses) => expenses.toJSON());
                  
          if(typeof expenseOfUser[0] !== 'undefined') {
              const expense = await Expense.findOrFail(params.id);
              await expense.delete();

              return expense;
          }
          else {
              return response.status(403).send('Área não autorizada');
          }
      }
}

module.exports = ExpenseController
