import { defineComponent, onMounted } from 'vue'
import { View } from '@/components/view'
import * as CatsList from '@/components/cats-list'
import { CatCard } from '@/components/cat-card'
import { useCats } from '@/contexts/cats-provider'
import { useAuthentication } from '@/contexts/authentication-provider'

export const HomePage = defineComponent({
  setup() {
    const cats = useCats()
    const auth = useAuthentication()

    onMounted(() => {
      cats?.value.fetchCats()
    })

    return () => {
      return (
        <View>
          <router-view />
          <View.Header />
          <View.Body>
            <CatsList.Root>
              <CatsList.Body>
                {cats?.value.loading && (
                  <>
                    {Array.from(new Array(8)).map((_, i) => (
                      <CatCard.Skeleton key={i} />
                    ))}
                  </>
                )}
                {!cats?.value.loading && cats?.value.cats.length === 0 && <CatsList.Empty />}
                {cats &&
                  cats.value.cats.length > 0 &&
                  cats.value.cats.map((cat) => {
                    return (
                      <CatCard>
                        <CatCard.Header>
                          <CatCard.Photo url={cat.photo.url} />
                          <CatCard.Name>{cat.name}</CatCard.Name>
                          <CatCard.Breed>{cat.breed.name}</CatCard.Breed>
                          <CatCard.Age>{cat.age.name}</CatCard.Age>
                        </CatCard.Header>
                        {cat.owner_email === auth?.value.authentication.Username && (
                          <CatCard.Footer>
                            <CatCard.Edit catId={cat.id} />
                          </CatCard.Footer>
                        )}
                      </CatCard>
                    )
                  })}
              </CatsList.Body>
            </CatsList.Root>
          </View.Body>
        </View>
      )
    }
  }
})
